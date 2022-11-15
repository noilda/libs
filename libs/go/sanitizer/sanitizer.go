package sanitizer

import (
	"regexp"

	"github.com/go-playground/validator/v10"
	"github.com/leebenson/conform"
)

type SValidator struct {
	validator *validator.Validate
}

func New() *SValidator {
	s := SValidator{}
	s.validator = validator.New()
	s.CustomValidators()
	return &s
}

func (v *SValidator) Validate(i interface{}) error {
	if err := conform.Strings(i); err != nil {
		return err
	}
	if err := v.validator.Struct(i); err != nil {
		return err
	}
	return nil
}

func (v *SValidator) CustomValidators() {
	v.validator.RegisterValidation("password", func(f validator.FieldLevel) bool {
		tests := []string{".{8,}", "[a-z]", "[A-Z]", "[0-9]"}
		for _, test := range tests {
			t, _ := regexp.MatchString(test, f.Field().String())
			if !t {
				return false
			}
		}

		return true
	})

	v.validator.RegisterValidation("date", func(f validator.FieldLevel) bool {
		t, _ := regexp.MatchString(`\d{4}-\d{2}-\d{2}`, f.Field().String())
		return t
	})

}
