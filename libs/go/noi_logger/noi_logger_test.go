package noi_logger

import (
	"testing"
)

func TestNoiLogger(t *testing.T) {
	result := NoiLogger("works")
	if result != "NoiLogger works" {
		t.Error("Expected NoiLogger to append 'works'")
	}
}