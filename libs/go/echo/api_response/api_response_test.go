package api_response

import (
	"testing"
)

func TestApiResponse(t *testing.T) {
	result := ApiResponse("works")
	if result != "ApiResponse works" {
		t.Error("Expected ApiResponse to append 'works'")
	}
}