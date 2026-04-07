/**
 * 简单颜色匹配
 */
namespace simpleColorMatch {

    // 样本颜色（根据你的潘通色卡平均值）
    let samples: { name: string, rgb: number[] }[] = [
        { name: "BrightRed", rgb: [4235, 4240, 4245] },
        { name: "Pink", rgb: [2843, 2843, 2843] },
        { name: "MediumPurple", rgb: [862, 862, 861] },
        { name: "DarkBlue", rgb: [503, 504, 503] },
        { name: "Yellow012u", rgb: [6152, 6152, 6145] }
    ]

    // 计算RGB距离
    function colorDistance(c1: number[], c2: number[]): number {
        let dr = c1[0] - c2[0]
        let dg = c1[1] - c2[1]
        let db = c1[2] - c2[2]
        return Math.sqrt(dr * dr + dg * dg + db * db)
    }

    // 匹配最接近的颜色
    // 输入：VEML6040 采集到的 RGB 数组 [R,G,B,W]
    export function matchColor(rgbw: number[]): string {
        let rgb = [rgbw[0], rgbw[1], rgbw[2]]  // 忽略 W
        let minDist = 999999
        let closest = "Unknown"
        for (let s of samples) {
            let dist = colorDistance(rgb, s.rgb)
            if (dist < minDist) {
                minDist = dist
                closest = s.name
            }
        }
        return closest
    }
}