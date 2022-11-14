package sanitizer

import (
	"testing"
)

func TestSanitizer(t *testing.T) {
	result := Sanitizer("works")
	if result != "Sanitizer works" {
		t.Error("Expected Sanitizer to append 'works'")
	}
}