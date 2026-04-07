
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
    const SD_ENABLE =   0x00
    const SD_DISABLE =  0x01

    // ===== Lux 灵敏度（Green 通道）=====
    const GSENS_40MS = 0.25168
    // const GSENS_80MS = 0.12584
    // const GSENS_160MS = 0.06292
    // const GSENS_320MS = 0.03146
    // const GSENS_640MS = 0.01573
    // const GSENS_1280MS = 0.007865

    let initialized = false

    function setConfiguration() {
        let buf = pins.createBuffer(3)
        buf[0] = REG_CONF;
        buf[1] = IT_320MS | AF_AUTO | SD_DISABLE;
        buf[2] = 0;
        pins.i2cWriteBuffer(VEML6040_ADDR, buf);
    }

    /**
         * 初始化
              */
    //% block="init VEML6040"
    export function init(): void {

        if (!initialized) {
            //writeReg(VEML6040_ADDR, 0x0000);

            setConfiguration();
            // 等待时间
            basic.pause(320);

            initialized = true
        }
    }


    function readReg(reg: number): number {
        let regBuf = pins.createBuffer(1)
        regBuf[0] = reg

        // false = repeated start
        pins.i2cWriteBuffer(VEML6040_ADDR, regBuf, false)

        let data = pins.i2cReadBuffer(VEML6040_ADDR, 2)

        return data[0] | (data[1] << 8)
    }

    // ====== RGB ======

    //% block="read red"
    export function red(): number {
        init()
        return readReg(REG_RED)
    }

    //% block="read green"
    export function green(): number {
        init()
        return readReg(REG_GREEN)
    }

    //% block="read blue"
    export function blue(): number {
        init()
        return readReg(REG_BLUE)
    }

    //% block="read white"
    export function white(): number {
        init()
        return readReg(REG_WHITE)
    }


    // ====== CCT ======

    //% block="read CCT"
    export function cct(): number {
        let r = red()
        let g = green()
        let b = blue()

        let ccti = ((r - b) / g) + 0.5;
        let cct = 4278.6 * Math.pow(ccti, -1.2455)

        return Math.round(cct)
    }
};
