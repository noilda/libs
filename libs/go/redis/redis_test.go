package redis

import (
	"testing"
)

func TestRedis(t *testing.T) {
	result := Redis("works")
	if result != "Redis works" {
		t.Error("Expected Redis to append 'works'")
	}
}