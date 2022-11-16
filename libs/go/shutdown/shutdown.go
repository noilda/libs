package shutdown

import (
	"context"
	"os"
	"os/signal"
	"strconv"
	"sync"
	"syscall"
	"time"

	"go.uber.org/zap"
)

// Operation is a clean up function on shutting down
type Operation func(ctx context.Context) error

// gracefulShutdown waits for termination syscalls and doing clean up operations after received it
func GracefulShutdown(ctx context.Context, timeout time.Duration, logger *zap.Logger, ops map[string]Operation) <-chan struct{} {
	wait := make(chan struct{})
	go func() {
		s := make(chan os.Signal, 1)

		// add any other syscalls that you want to be notified with
		signal.Notify(s, syscall.SIGINT, syscall.SIGTERM, syscall.SIGHUP)
		<-s

		logger.Info("shutting down")

		// set timeout for the ops to be done to prevent system hang
		timeoutFunc := time.AfterFunc(timeout, func() {
			logger.Info("timeout" + strconv.FormatInt(timeout.Milliseconds(), 10) + " ms has been elapsed, force exit")
			os.Exit(0)
		})

		defer timeoutFunc.Stop()

		var wg sync.WaitGroup

		// Do the operations asynchronously to save time
		for key, op := range ops {
			wg.Add(1)
			innerOp := op
			innerKey := key
			go func() {
				defer wg.Done()

				logger.Info("cleaning up: " + innerKey)
				if err := innerOp(ctx); err != nil {
					logger.Info(innerKey + ": clean up failed: " + err.Error())
					return
				}

				logger.Info(innerKey + " was shutdown gracefully")
			}()
		}

		wg.Wait()

		close(wait)
	}()

	return wait
}
