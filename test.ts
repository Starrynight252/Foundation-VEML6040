// 在此处测试；当此软件包作为插件使用时，将不会编译此软件包。

basic.forever(function () {
    serial.writeLine("R:" + veml6040.red())
    serial.writeLine("G:" + veml6040.green())
    serial.writeLine("B:" + veml6040.blue())
    serial.writeLine("W:" + veml6040.white())
    basic.pause(500)
})
