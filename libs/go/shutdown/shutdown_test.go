package shutdown

import (
	"testing"
)

func TestShutdown(t *testing.T) {
	result := Shutdown("works")
	if result != "Shutdown works" {
		t.Error("Expected Shutdown to append 'works'")
	}
}