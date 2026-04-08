namespace veml6040 {

    // ===== I2C 地址 =====
    const VEML6040_ADDR = 0x10

    // ===== 寄存器地址 =====
    const REG_CONF = 0x00
    const REG_RED = 0x08
    const REG_GREEN = 0x09
    const REG_BLUE = 0x0A
    const REG_WHITE = 0x0B

    // ===== 积分时间（Integration Time）=====
    //const IT_40MS = 0x00
    // const IT_80MS = 0x10
    // const IT_160MS = 0x20
    const IT_320MS = 0x30
    // const IT_640MS = 0x40
    // const IT_1280MS = 0x50

    // ===== 触发模式 =====
    const TRIG_DISABLE = 0x00
    //   const TRIG_ENABLE = 0x04

    // ===== 自动 / 强制 =====
    const AF_AUTO = 0x00
    // const AF_FORCE = 0x02
    const SD_ENABLE = 0x00
    const SD_DISABLE = 0x01

    // ===== Lux 灵敏度（Green 通道）=====
    const GSENS_40MS = 0.25168
    // const GSENS_80MS = 0.12584
    // const GSENS_160MS = 0.06292
    // const GSENS_320MS = 0.03146
    // const GSENS_640MS = 0.01573
    // const GSENS_1280MS = 0.007865

    let initialized = false;
    let redBuffer = 0;
    let greenBuffer = 0;
    let blueBuffer = 0;
    let whiteBuffer = 0;

    function setConfiguration() {
        let buf = pins.createBuffer(3)
        buf[0] = REG_CONF;
        buf[1] = IT_320MS | AF_AUTO | SD_ENABLE;
        buf[2] = 0;
        pins.i2cWriteBuffer(VEML6040_ADDR, buf, false);
    }

    /**
         * 初始化
              */
    //% block="init VEML6040"
    export function init(): void {

        if (!initialized) {
            setConfiguration();
            // 等待时间
            basic.pause(320);

            initialized = true
        }
    }

    /* 读取寄存器 */
    function readReg(reg: number): number {
        let regBuf = pins.createBuffer(1)
        regBuf[0] = reg

        pins.i2cWriteBuffer(VEML6040_ADDR, regBuf, false)
        // pins.i2cWriteNumber(VEML6040_ADDR, reg, NumberFormat.UInt8BE, false)
        let data = pins.i2cReadBuffer(VEML6040_ADDR, 2, false)

        return data[0] | (data[1] << 8)
    }

    /*读取全部颜色 */
    //% block="read AllColour"
    export function readAllColour(): void {
        init()  // 确保初始化一次

        // 读取各通道
        redBuffer = readReg(REG_RED)
        basic.pause(320)
        greenBuffer = readReg(REG_GREEN)
        basic.pause(320)
        blueBuffer = readReg(REG_BLUE)
        basic.pause(320)
        whiteBuffer = readReg(REG_WHITE)

        //return [redBuffer, greenBuffer, blueBuffer, whiteBuffer]
    }


    // ====== RGB ======
    //% block="read Red"
    export function readRed(): number {
        init()
        basic.pause(20);
        return readReg(REG_RED)
    }
    //% block="read Green"
    export function readGreen(): number {
        init()
        basic.pause(20);
        return readReg(REG_GREEN)
    }
    //% block="read Blue"
    export function readBlue(): number {
        init()
        basic.pause(20);
        return readReg(REG_BLUE)
    }
    //% block="read White"
    export function readWhite(): number {
        init()
        basic.pause(20);
        return readReg(REG_WHITE)
    }
    
    // ====== CCT ======
    //% block="read CCT"
    export function readCCT(): number {
        let ccti = ((redBuffer - greenBuffer) / blueBuffer) + 0.5;
        let cct = 4278.6 * Math.pow(ccti, -1.2455)

        return Math.round(cct)
    }
}
