package randmizer

import (
	"testing"
)

func TestRandmizer(t *testing.T) {
	result := Randmizer("works")
	if result != "Randmizer works" {
		t.Error("Expected Randmizer to append 'works'")
	}
}