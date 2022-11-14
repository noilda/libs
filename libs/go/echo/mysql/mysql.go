package mysql

import (
	"fmt"
	"strconv"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var lLog lLogger

func UseLogger(logger lLogger) {
	lLog = logger
}

type Logger interface {
	Info(msg string, args ...interface{})
}

type lLogger struct{}

func (*lLogger) Info(msg string, args ...interface{}) { fmt.Println(msg) }

type DbConfig struct {
	DB          string `mapstructure:"DB" validate:"required"`
	User        string `mapstructure:"USER" validate:"required"`
	Password    string `mapstructure:"PASSWORD" validate:"required"`
	Host        string `mapstructure:"HOST" validate:"required"`
	Port        string `mapstructure:"PORT" validate:"required"`
	MaxLifetime string `mapstructure:"MAX_LIFETIME" validate:"required"`
	MaxOpenConn string `mapstructure:"MAX_OPEN_CONNECTIONS" validate:"required"`
	MaxIdleConn string `mapstructure:"MAX_IDLE_CONNECTIONS" validate:"required"`
}

func Init(config DbConfig) (*sqlx.DB, error) {
	dbUrl := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4,collation=utf8mb4_general_ci,parseTime=true",
		config.User,
		config.Password,
		config.Host,
		config.Port,
		config.DB,
	)

	db, err := sqlx.Open("mysql", dbUrl)
	if err != nil {
		return nil, fmt.Errorf("db err: " + err.Error())
	}
	// health(db)

	maxCon, err := strconv.Atoi(config.MaxIdleConn)
	if err == nil {
		db.SetMaxIdleConns(maxCon)
	} else {
		lLog.Info("Parsing DBMaxIdleConn failed. Using Default.")
	}
	openConn, err := strconv.Atoi(config.MaxOpenConn)
	if err == nil {
		db.SetMaxOpenConns(openConn)
	} else {
		lLog.Info("Parsing DBMaxOpenConn failed. Using Default.")
	}
	lifeConn, err := strconv.Atoi(config.MaxLifetime)
	if err == nil {
		db.SetConnMaxLifetime(time.Duration(lifeConn))
	} else {
		lLog.Info("Parsing DBMaxLifetime failed. Using Default.")
	}
	lLog.Info("Database connected")

	return db, nil
}

// func health(db *sqlx.DB) bool {

// 	if err := db.Ping(); err != nil {
// 		d.Log.Fatal("db err: " + err.Error())
// 		return false
// 	}
// 	return true
// }
