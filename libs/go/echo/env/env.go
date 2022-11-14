package env

import (
	"fmt"
	"strings"

	"github.com/spf13/viper"
)

func LoadConfig() (map[string]interface{}, error) {
	//initiate a viper instance for common config
	v := viper.New()
	//set config for all viper instances
	v.SetConfigType("env")
	v.SetConfigName("secrets")
	v.AddConfigPath("../../../")
	err := v.ReadInConfig()
	if err != nil {
		return nil, fmt.Errorf("error reading file. Error: %v", err)
	}
	c := v.AllSettings()

	//read from config file within project
	viper.AddConfigPath(".")
	err = viper.ReadInConfig()
	if err != nil {
		return nil, fmt.Errorf("error reading file. Error: %v", err)
	}
	//read config from env and override previously set config
	viper.AutomaticEnv()
	//merge config of two config files
	viper.MergeConfigMap(c)
	//get all config
	rawConfig := viper.AllSettings()
	var a []string
	//used to store nested  one level config
	oneLevelConfig := map[string]map[string]interface{}{}
	config := map[string]interface{}{}
	for key, val := range rawConfig {
		//use "__" to distinct betwen nested config vs simple ones
		if strings.Contains(key, "__") {
			//split simple config to add in a map
			a = strings.Split(key, "__")
			//do not allow 2 level config. This config keys are not common ones
			if len(a) < 3 {
				l := map[string]interface{}{}
				if len(oneLevelConfig) > 0 {
					for k, nval := range oneLevelConfig {
						if a[0] == k {
							l = nval
							l[a[1]] = val
						} else {
							l[a[1]] = val
						}
					}
					oneLevelConfig[a[0]] = l

				} else {
					l[a[1]] = val
					oneLevelConfig[a[0]] = l
				}
			}

		} else {
			config[key] = val
		}
	}
	for k, v := range oneLevelConfig {
		config[k] = v
	}
	return config, nil
}
