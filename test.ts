// 在此处测试；当此软件包作为插件使用时，将不会编译此软件包。
veml6040.init()

basic.forever(function () {
    serial.writeLine("R:" + veml6040.red())
    basic.pause(500)
})
