/**
 * VEML6040 Color Sensor
 */
//% weight=100 color=#AA278D icon="\uf043"
namespace veml6040 {

    const ADDR = 0x10

    function writeReg(reg: number, value: number): void {
        let buf = pins.createBuffer(3)
        buf[0] = reg
        buf[1] = value & 0xff
        buf[2] = (value >> 8) & 0xff
        pins.i2cWriteBuffer(ADDR, buf)
    }

    function readReg(reg: number): number {
        pins.i2cWriteNumber(ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(ADDR, NumberFormat.UInt16LE)
    }

    /**
     * 初始化传感器
     */
    //% block="init VEML6040"
    export function init(): void {
        // 配置寄存器（默认配置）
        writeReg(0x00, 0x0000)
        basic.pause(10)
    }

    /**
     * 读取红色
     */
    //% block="red value"
    export function red(): number {
        return readReg(0x08)
    }

    /**
     * 读取绿色
     */
    //% block="green value"
    export function green(): number {
        return readReg(0x09)
    }

    /**
     * 读取蓝色
     */
    //% block="blue value"
    export function blue(): number {
        return readReg(0x0A)
    }

    /**
     * 读取白光
     */
    //% block="white value"
    export function white(): number {
        return readReg(0x0B)
    }
}
