package cors

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type CorsConfig struct {
	Origin string `mapstructure:"Origin" validate:"required"`
}

// CORS middleware
func Cors(config CorsConfig) echo.MiddlewareFunc {
	return middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{config.Origin},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAccessControlAllowMethods},
		AllowCredentials: true,
		AllowMethods:     []string{echo.GET, echo.POST, echo.OPTIONS, echo.DELETE, echo.PUT},
	})

	// if c.Request.Method == "OPTIONS" {
	// 	c.AbortWithStatus(204)
	// 	return
	// }

	// c.Next()
}
