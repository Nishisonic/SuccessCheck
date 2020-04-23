load("script/utils.js")

function header() {
    return [ "艦数#遠征要求隻数", "旗艦Lv#遠征要求旗艦Lv", "合計Lv#遠征要求合計Lv", "必須艦#遠征要求艦", "時間#遠征時間", "提督#遠征提督経験値", "艦娘#遠征艦娘経験値", "燃料#遠征獲得燃料", "弾薬#遠征獲得弾薬", "鋼材#遠征獲得鋼材", "ボーキ#遠征獲得ボーキ", "報酬1#遠征獲得報酬1", "報酬2#遠征獲得報酬2"]
}

function begin(fleetid) { }

function body(data) {
    return toComparable(mission_data(data.id))
}

function end() { }

//隻数 旗艦Lv 合計Lv 必要艦 時間 提督経験値 艦娘経験値 燃料 弾薬 鋼材 ボーキ 報酬1 報酬2
function mission_data(missionID){
    switch(missionID){
        // 鎮守府海域
        case 1: return [2, 1, 0, "-", "00:15", 10, 10, 0, 30, 0, 0, "", ""]
        case 2: return [4, 2, 0, "-", "00:30", 20, 15, 0, 100, 30, 0, "高速修復材×0~1", ""]
        case 3: return [3, 3, 0, "-", "00:20", 30, 30, 30, 30, 40, 0, "", ""]
        case 4: return [3, 3, 0, "軽1 (駆+海防)2", "00:50", 30, 40, 0, 70, 0, 0, "高速修復材×0~1", "家具箱(小)×0~1"]
        case 5: return [4, 3, 0, "軽1 (駆+海防)2", "01:30", 40, 40, 200, 200, 20, 20, "", ""]
        case 6: return [4, 4, 0, "-", "00:40", 30, 50, 0, 0, 0, 80, "家具箱(小)×0~1", ""]
        case 7: return [6, 5, 0, "-", "01:00", 60, 120, 0, 0, 50, 30, "高速建造材×0~1", ""]
        case 8: return [6, 6, 0, "-", "03:00", 120, 140, 50, 100, 50, 50, "高速建造材×0~2", "開発資材×0~1"]
        case 100: return [4, 5, 10, "(駆+海防)3", "00:25", 15, 10, 45, 45, 0, 0, "", ""]
        case 101: return [4, 20, 0, "(駆+海防)4 火力50 対空70 対潜180", "00:55", 40, 45, 70, 40, 0, 10, "開発資材×0~1", "高速修復材×0~1"]
        case 102: return [5, 35, 185, "軽1 (駆+海防)3 対空59 対潜280 索敵60", "02:15", 55, 70, 120, 0, 60, 60, "高速修復材×0~1", "開発資材×0~2"]
        case 103: return [5, 40, 200, "軽1 (駆+海防)2 火力300 対空200 対潜200 索敵120", "01:50", 45, 55, 80, 120, 0, 100, "高速修復材×0~2", "高速建造材×0~2"]
        // 南西諸島海域
        case 9: return [4, 3, 0, "軽1 (駆+海防)2", "04:00", 60, 60, 350, 0, 0, 0, "家具箱(小)×0~1", "高速修復材×0~2"]
        case 10: return [3, 3, 0, "軽2", "01:30", 40, 50, 0, 50, 0, 40, "高速修復材×0~1", "高速建造材×0~1"]
        case 11: return [4, 6, 0, "(駆+海防)2", "05:00", 40, 40, 0, 0, 0, 250, "家具箱(小)×0~1", "高速修復材×0~1"]
        case 12: return [4, 4, 0, "(駆+海防)2", "08:00", 60, 50, 50, 250, 200, 50, "家具箱(中)×0~1", "開発資材×0~1"]
        case 13: return [6, 5, 0, "軽1 駆4", "04:00", 70, 60, 240, 300, 0, 0, "高速修復材×0~2", "家具箱(小)×0~1"]
        case 14: return [6, 6, 0, "軽1 駆3", "06:00", 90, 100, 0, 280, 200, 30, "高速修復材×0~1", "開発資材×0~1"]
        case 15: return [6, 9, 0, "空母2 駆2", "12:00", 100, 160, 0, 0, 300, 400, "家具箱(大)×0~1", "開発資材×0~1"]
        case 16: return [6, 10, 0, "軽1 駆2", "15:00", 120, 200, 500, 500, 200, 200, "高速建造材×0~2", "開発資材×0~2"]
        case 110: return [6, 40, 150, "水母1 軽1 (駆+海防)2 対空200 対潜200 索敵140", "00:35", 35, 40, 0, 0, 10, 30, "家具箱(小)×0~1", "高速修復材×0~1"]
        case 111: return [6, 45, 220, "重1 軽1 駆3 火力360 対空160 対潜160 索敵140", "08:40", 70, 130, 300, 200, 100, 0, "開発資材×0~2", "高速修復材×0~2"]
        case 112: return [6, 50, 250, "水母1 軽1 (駆+海防)4 火力400 対空220 対潜220 索敵190", "02:50", 50, 70, 0, 100, 100, 180, "家具箱(大)×0~1", "高速修復材×0~2"]
        case 113: return [6, 55, 349, "重2 軽1 駆2 潜1 火力500 対潜280", "07:30", 60, 100, 0, 0, 1200, 650, "開発資材×0~4", "改修資材×0~1"]
        case 114: return [6, 64, 405, "水母1 軽1 駆2 火力510 対空400 対潜285 索敵385", "06:30", 100, 130, 500, 500, 1000, 750, "高速修復材×0~4", "改修資材×0~1"]
        // 北方海域
        case 17: return [6, 20, 0, "軽1 駆3", "00:45", 30, 40, 70, 90, 50, 0, "", ""]
        case 18: return [6, 15, 0, "空母3 駆2", "05:00", 60, 60, 0, 0, 300, 150, "高速修復材×0~1", ""]
        case 19: return [6, 20, 0, "航戦2 駆2", "06:00", 60, 70, 400, 50, 50, 30, "家具箱(小)×0~1", "開発資材×0~1"]
        case 20: return [2, 1, 0, "潜1 軽1", "02:00", 40, 50, 0, 0, 150, 0, "開発資材×0~1", "家具箱(中)×0~1"]
        case 21: return [5, 15, 30, "軽1 駆4 ﾄﾞﾗﾑ缶3隻", "02:20", 45, 55, 320, 270, 0, 0, "家具箱(小)×0~1", ""]
        case 22: return [6, 30, 45, "重1 軽1 駆2", "03:00", 45, 400, 0, 10, 0, 0, "", ""]
        case 23: return [6, 50, 200, "航戦2 駆2", "04:00", 70, 420, 0, 50, 0, 130, "家具箱(中)×0~1", ""]
        case 24: return [6, 50, 200, "軽1[旗艦] 駆4", "08:20", 65, 80, 500, 0, 0, 150, "開発資材×0~2", "高速修復材×0~1"]
        // 南西海域
        case 41: return [3, 30, 100, "(駆+海防)3 火力60 対空80 対潜210", "01:00", 30, 50, 100, 0, 0, 20, "開発資材×0~1", "高速修復材×0~1"]
        case 42: return [4, 45, 200, "軽1 駆2", "08:00", 60, 65, 800, 0, 0, 200, "家具箱(大)×0~1", "高速建造材×0~3"]
        case 43: return [6, 55, 300, "護空1[旗艦] 駆2or海防2 火力500 対空280 対潜280 索敵209", "12:00", 75, 90, 2000, 0, 0, 400, "開発資材×0~4", "改修資材×0~1"]
        case 44: return [6, 35, 210, "空母2 水母1 軽1 (駆+海防)2 対潜200 ﾄﾞﾗﾑ缶3隻6個", "10:00", 45, 55, 0, 200, 0, 800, "開発資材×0~4", "家具箱(大)×0~2"]
        case 45: return [5, 50, 240, "軽母1[旗艦] (駆+海防)4 対空240 対潜300 索敵180", "03:20", 35, 40, 40, 0, 0, 220, "家具箱(中)×0~1", ""]
        // 西方海域
        case 25: return [4, 25, 0, "重2 駆2", "40:00", 80, 180, 900, 0, 500, 0, "家具箱(中)×0~1", ""]
        case 26: return [4, 30, 0, "空母1 軽1 駆2", "80:00", 150, 200, 0, 0, 0, 900, "高速修復材×0~3", "家具箱(大)×0~1"]
        case 27: return [2, 1, 0, "潜2", "20:00", 80, 60, 0, 0, 800, 0, "開発資材×0~2", "家具箱(小)×0~2"]
        case 28: return [3, 30, 0, "潜3", "25:00", 100, 140, 0, 0, 900, 350, "開発資材×0~3", "家具箱(中)×0~2"]
        case 29: return [3, 50, 0, "潜3", "24:00", 100, 100, 0, 50, 0, 100, "開発資材×0~1", "家具箱(小)×0~1"]
        case 30: return [4, 55, 0, "潜4", "48:00", 100, 150, 0, 50, 0, 100, "開発資材×0~3", "家具箱(大)×0~1"]
        case 31: return [4, 60, 200, "潜4", "02:00", 50, 50, 0, 30, 0, 0, "家具箱(小)×0~1", ""]
        case 32: return [3, 5, 0, "練巡1[旗艦] 駆2", "24:00", 300, "？", 50, 50, 50, 50, "家具箱(大)×0~1", "開発資材×0~3"]
        case 131: return [5, 50, 200, "水母1[旗艦] 駆3 対空240 対潜240 索敵300", "02:00", 35, 45, 0, 20, 20, 100, "高速修復材×0~1", ""]
        case 132: return [5, 55, 270, "潜水母艦1[旗艦] 潜3 火力60 対空80 対潜50", "10:00", 70, 90, 0, 0, 400, 800, "給糧艦「伊良湖」×0~1", "家具箱(大)×0~1"]
        // 南方海域
        case 33: return [2, 0, 0, "駆2", "00:15", 0, 0, 0, 0, 0, 0, "", ""]
        case 34: return [2, 0, 0, "駆2", "00:30", 0, 0, 0, 0, 0, 0, "", ""]
        case 35: return [6, 40, 0, "空母2 重1 駆1", "07:00", 100, 100, 0, 0, 240, 280, "家具箱(小)×0~2", "開発資材×0~1"]
        case 36: return [6, 30, 0, "水母2 軽1 駆1", "09:00", 100, 100, 480, 0, 200, 200, "家具箱(中)×0~2", "高速修復材×0~1"]
        case 37: return [6, 50, 200, "軽1 駆5 ﾄﾞﾗﾑ缶3隻4個", "02:45", 50, 65, 0, 380, 270, 0, "家具箱(小)×0~1", ""]
        case 38: return [6, 65, 240, "駆5 ﾄﾞﾗﾑ缶4隻8個", "02:55", 50, 70, 420, 0, 200, 0, "家具箱(小)×0~1", ""]
        case 39: return [5, 3, 180, "潜水母艦1 潜4", "30:00", 130, 320, 0, 30, 300, 0, "高速修復材×0~2", "家具箱(中)×0~1"]
        case 40: return [6, 25, 150, "軽1[旗艦] 水母2 駆2", "06:50", 60, 70, 300, 300, 0, 100, "家具箱(小)×0~3", "高速修復材×0~1"]
        case 141: return [6, 61, 349, "重1[旗艦] 軽1 駆3 火力450 対空350 対潜330 索敵250", "07:30", 100, 0, 0, 600, 600, 1000, "家具箱(大)×0~2", "改修資材×0~1"]
        default: return [0, 0, 0, "不明", "不明", 0, 0, 0, 0, 0, 0, "不明" , "不明"]
    }
}
