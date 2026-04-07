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
    let rgbw = veml6040.readAllColour()
    let colorName = simpleColorMatch.matchColor(rgbw)
    serial.writeLine("R:" + rgbw[0] + " G:" + rgbw[1] + " B:" + rgbw[2] + " -> " + colorName)
    basic.pause(500)
})