package main

import (
	"fmt"

	gcfg "gopkg.in/gcfg.v1"
	macaron "gopkg.in/macaron.v1"
)

var (
	cfg struct {
		General struct {
			Title string
		}
		JSLib map[string]*struct {
			Url string
		}
	}
)

func main() {
	error := gcfg.ReadFileInto(&cfg, "config")

	if error != nil {
		fmt.Println(error)
		return
	}

	m := macaron.Classic()
	m.Use(macaron.Renderer())
	m.Use(macaron.Static("scripts"))
	m.Use(macaron.Static("assets"))

	m.Get("/", func(ctx *macaron.Context) {
		ctx.Data["DefaultTitle"] = cfg.General.Title
		ctx.Data["JSLibs"] = cfg.JSLib
		ctx.HTML(200, "index")
	})
	m.Run()
}
