package redis

import (
	"fmt"
	"strconv"
	"time"

	"github.com/go-redis/redis/v8"
)

type RedisConfig struct {
	Port string `mapstructure:"PORT" validate:"required"`
	Host string `mapstructure:"HOST" validate:"required"`
	Db   string `mapstructure:"MAIN_DB" validate:"required"`
}

var lLog lLogger

func UseLogger(logger lLogger) {
	lLog = logger
}

type Logger interface {
	Info(msg string, args ...interface{})
}

type lLogger struct{}

func (*lLogger) Info(msg string, args ...interface{}) { fmt.Println(msg) }

func Init(config RedisConfig) (*redis.Client, error) {
	db, err := strconv.Atoi(config.Db)
	if err != nil {
		return nil, fmt.Errorf("unable to parse redis DB")
	}
	pool := redis.NewClient(&redis.Options{
		Addr:        config.Host + ":" + config.Port,
		DB:          db,
		IdleTimeout: 240 * time.Second,
	})

	lLog.Info("Redis connected.")

	// {
	// 	MaxIdle:     50,
	// 	IdleTimeout: 240 * time.Second,
	// 	MaxActive:   200,
	// 	TestOnBorrow: func(c redis.Conn, t time.Time) error {
	// 		_, err := c.Do("PING")
	// 		return err
	// 	},
	// 	Wait: true,
	// 	Dial: func() (redis.Conn, error) {
	// 		conn, err := redis.Dial("tcp", d.Config.RedisHost+":"+d.Config.RedisPort)

	// 		if err != nil {
	// 			d.Log.Fatal("ERROR: fail initializing the redis pool: " + err.Error())
	// 			os.Exit(1)
	// 		}
	// 		return conn, err
	// 	},
	// }
	// d.Health(pool.Get())
	return pool, nil
}

// func (d Redis) Health(r redis.Conn) bool {
// 	//TODO
// 	// s, err := redis.String(r.Do("PING"))
// 	// if err != nil && s != "PONG" {
// 	// 	d.Log.Info(err.Error())
// 	// 	d.Log.Fatal("Redis connection lost")
// 	// 	return false
// 	// }
// 	// d.Log.Info("Redis connection healthy")
// 	return true
// }
