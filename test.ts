// 在此处测试；当此软件包作为插件使用时，将不会编译此软件包。
// veml6040.init()
// basic.forever(function () {
//     let rgbw = veml6040.readAllColour()
//     serial.writeLine("R:" + rgbw[0])
//     serial.writeLine("G:" + rgbw[1])
//     serial.writeLine("B:" + rgbw[2])
//     serial.writeLine("W:" + rgbw[3])
//     basic.pause(500)
// })

veml6040.init()
basic.forever(function () {
veml6040.readAllColour()
serial.writeValue("R", veml6040.readRed())
serial.writeValue("G", veml6040.readGreen())
serial.writeValue("B", veml6040.readBlue())
serial.writeValue("W", veml6040.readWhite())
serial.writeValue("CCT", veml6040.readCCT())
    basic.pause(500)
})

// basic.forever(function () {
//     let rgbw = veml6040.readAllColour()
//    simpleColorMatch.matchColor(0, 0, 0)
//     serial.writeLine("R:" + rgbw[0] + " G:" + rgbw[1] + " B:" + rgbw[2] + " -> " )
//     basic.pause(500)
// })