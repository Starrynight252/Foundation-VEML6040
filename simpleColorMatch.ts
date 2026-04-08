/**
 * 简单颜色匹配
 */
namespace simpleColorMatch {

    // 定义枚举
    export enum ColorType {
        //% block="亮红"
        BrightRed,
        //% block="粉色"
        Pink,
        //% block="紫色"
        MediumPurple,
        //% block="深蓝"
        DarkBlue,
        //% block="黄色"
        Yellow012u,
        //% block="未知"
        Unknown
    }

    // 样本颜色
    let samples: { type: ColorType, rgb: number[] }[] = [
        { type: ColorType.BrightRed, rgb: [4235, 4240, 4245] },
        { type: ColorType.Pink, rgb: [2843, 2843, 2843] },
        { type: ColorType.MediumPurple, rgb: [862, 862, 861] },
        { type: ColorType.DarkBlue, rgb: [503, 504, 503] },
        { type: ColorType.Yellow012u, rgb: [6152, 6152, 6145] }
    ]

    // 计算RGB距离
    function colorDistance(c1: number[], c2: number[]): number {
        let dr = c1[0] - c2[0]
        let dg = c1[1] - c2[1]
        let db = c1[2] - c2[2]
        return Math.sqrt(dr * dr + dg * dg + db * db)
    }

    /**
     * 匹配最接近的颜色
     */
    //% block="匹配颜色 RGB %r|%g|%b"
    //% weight=100
    export function matchColor(r: number, g: number, b: number): ColorType {

        let rgb = [r, g, b]

        let minDist = 999999
        let closest = ColorType.Unknown

        for (let s of samples) {
            let dist = colorDistance(rgb, s.rgb)
            if (dist < minDist) {
                minDist = dist
                closest = s.type
            }
        }

        return closest
    }
}