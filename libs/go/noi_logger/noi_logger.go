package noi_logger

import (
	"fmt"
	"strings"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func New(env string, logLevel string) (*zap.Logger, error) {
	log, err := setLogLevel(env, logLevel)
	if err != nil {
		return nil, fmt.Errorf("logger could not be initialized: %v", err)
	}
	log.Debug("Logger setup has finished")
	return log, nil
}

func setLogLevel(env string, logLevel string) (*zap.Logger, error) {

	var config zap.Config
	if env == "dev" {
		config = zap.NewDevelopmentConfig()
	} else {
		config = zap.NewProductionConfig()
	}

	if exists := logLevel != ""; exists {
		logLevel = strings.ToLower(logLevel)
		switch logLevel {
		case "debug":
			config.Level = zap.NewAtomicLevelAt(zapcore.DebugLevel)
		case "info":
			config.Level = zap.NewAtomicLevelAt(zapcore.InfoLevel)
		case "warn":
			config.Level = zap.NewAtomicLevelAt(zapcore.WarnLevel)
		case "error":
			config.Level = zap.NewAtomicLevelAt(zapcore.ErrorLevel)
		case "panic":
			config.Level = zap.NewAtomicLevelAt(zapcore.PanicLevel)
		case "fatal":
			config.Level = zap.NewAtomicLevelAt(zapcore.FatalLevel)
		}
	}

	return config.Build()
}
