/**
 * 遠征確認
 * @version 2.1.6
 * @author Nishikuma
 */

GlobalContext = Java.type("logbook.data.context.GlobalContext")

/**
 * 遠征が成功するかを文字列で返します
 *
 * @param {Number} missionId 遠征ID
 * @param {Number} fleetId 艦隊番号
 * @return {String} ○ or ｘ or "？"
 */
function canMissionToString(missionId, fleetId){
    var c = canMission(missionId, fleetId)
    return c === undefined ? "？" : c ? "○" : "ｘ"
}

/**
 * 遠征が成功するかを返します
 *
 * @param {Number} id 遠征ID
 * @param {Number} fleetId 艦隊番号
 * @return {Boolean|undefined} 登録されてないならundefined、そうでない場合はBooleanで成功かを返す
 */
function canMission(id, fleetId) {
    var dock = GlobalContext.getDock(fleetId)

    if (dock && dock.ships) {
        var ships = Java.from(dock.ships)
        var shipNum = ships.length
        var stypes = ships.reduce(function(array, ship) {
            if (!Array.isArray(array[ship.stype])) {
                array[ship.stype] = []
            }
            array[ship.stype].push(ship)
            return array
        }, {})
        /** 海防艦 */
        var DE = (stypes[1] || []).length
        /** 駆逐艦 */
        var DD = (stypes[2] || []).length
        /** 軽巡洋艦 */
        var CL = (stypes[3] || []).length
        /** 重雷装巡洋艦 */
        var CLT = (stypes[4] || []).length
        /** 重巡洋艦 */
        var CA = (stypes[5] || []).length
        /** 航空巡洋艦 */
        var CAV = (stypes[6] || []).length
        /** 軽空母 */
        var CVL = (stypes[7] || []).length
        /** 護衛空母 */
        var CVE = (stypes[7] || []).filter(function (ship) {
            return ship.max.taisen > 0
        }).length
        /** 巡洋戦艦 */
        var FBB = (stypes[8] || []).length
        /** 戦艦 */
        var BB = (stypes[9] || []).length
        /** 航空戦艦 */
        var BBV = (stypes[10] || []).length
        /** 正規空母 */
        var CV = (stypes[11] || []).length
        /** 超弩級戦艦 */
        var XBB = (stypes[12] || []).length
        /** 潜水艦 */
        var SS = (stypes[13] || []).length
        /** 潜水空母 */
        var SSV = (stypes[14] || []).length
        /** 補給艦(敵) */
        var AP = (stypes[15] || []).length
        /** 水上機母艦 */
        var AV = (stypes[16] || []).length
        /** 揚陸艦 */
        var LHA = (stypes[17] || []).length
        /** 装甲空母 */
        var CVB = (stypes[18] || []).length
        /** 工作艦 */
        var AR = (stypes[19] || []).length
        /** 潜水母艦 */
        var AS = (stypes[20] || []).length
        /** 練習巡洋艦 */
        var CT = (stypes[21] || []).length
        /** 補給艦 */
        var AO = (stypes[22] || []).length
        /** 護衛艦隊か */
        var isFleetEscortForce = DD >= 1 && DE >= 3 || CT >= 1 && DE >= 2 || CVE >= 1 && DE >= 2 || CVE >= 1 && DD >= 2
        /** 旗艦 */
        var flagship = ships[0]
        /** 旗艦Lv */
        var flagshipLv = flagship.lv
        /** 旗艦艦種 */
        var flagshipStype = flagship.stype
        /** 艦隊合計Lv */
        var totalLv = ships.map(function (ship) {
            return ship.lv
        }).reduce(function (previous, current) {
            return previous + current
        }, 0)
        /** 火力合計 */
        var FP = toTotalValue(ships, "houg")
        /** 対空合計 */
        var AA = toTotalValue(ships, "tyku")
        /** 対潜合計 */
        var ASW = toTotalValue(ships, "tais")
        /** 索敵合計 */
        var LOS = toTotalValue(ships, "saku")
        /** ドラム缶所持艦合計 */
        var drumShips = toHasItemShipNum(ships, [75])
        /** ドラム缶合計 */
        var drum = toHasItemSum(ships, [75])

        switch (id) {
            // 鎮守府海域
            case 1: // 練習航海
                return shipNum >= 2
            case 2: // 長距離練習航海
                return flagshipLv >= 2 && shipNum >= 4
            case 3: // 警備任務
                return flagshipLv >= 3 && shipNum >= 3
            case 4: // 対潜警戒任務
                return flagshipLv >= 3 && shipNum >= 3 && (CL >= 1 && (DE + DD) >= 2 || isFleetEscortForce)
            case 5: // 海上護衛任務
                return flagshipLv >= 3 && shipNum >= 4 && (CL >= 1 && (DE + DD) >= 2 || isFleetEscortForce)
            case 6: // 防空射撃演習
                return flagshipLv >= 4 && shipNum >= 4
            case 7: // 観艦式予行
                return flagshipLv >= 5 && shipNum >= 6
            case 8: // 観艦式
                return flagshipLv >= 6 && shipNum >= 6
            case 100: // 兵站強化任務
                return flagshipLv >= 5 && shipNum >= 4 && (DE + DD) >= 3 && totalLv >= 10
            case 101: // 海峡警備行動
                return flagshipLv >= 20 && shipNum >= 4 && (DE + DD) >= 4 && (FP >= 50 && AA >= 70 && ASW >= 180)
            case 102: // 長時間対潜警戒
                return flagshipLv >= 35 && shipNum >= 5 && (CL >= 1 && (DE + DD) >= 3 || isFleetEscortForce) && (ASW >= 280 && LOS >= 60) && totalLv >= 185
            case 103: // 南西方面連絡線哨戒
                return flagshipLv >= 40 && shipNum >= 5 && (CL >= 1 && DD >= 2 || isFleetEscortForce) && (FP >= 300 && AA >= 200 && ASW >= 200 && LOS >= 120) && totalLv >= 200
            case 104: // 小笠原沖哨戒線
                return flagshipLv >= 45 && shipNum >= 5 && (CL >= 1 && DD >= 3 || isFleetEscortForce) && (FP >= 280 && AA >= 220 && ASW >= 240 && LOS >= 150) && totalLv >= 230
            case 105: // 小笠原沖戦闘哨戒
                return flagshipLv >= 55 && shipNum >= 5 && (CL >= 1 && DD >= 3 || isFleetEscortForce) && (FP >= 330 && AA >= 300 && ASW >= 270 && LOS >= 180) && totalLv >= 290
            // 南西諸島海域
            case 9: // タンカー護衛任務
                return flagshipLv >= 3 && shipNum >= 4 && (CL >= 1 && (DE + DD) >= 2 || isFleetEscortForce)
            case 10: // 強行偵察任務
                return flagshipLv >= 3 && shipNum >= 3 && CL >= 2
            case 11: // ボーキサイト輸送任務
                return flagshipLv >= 6 && shipNum >= 4 && (DE + DD) >= 2
            case 12: // 資源輸送任務
                return flagshipLv >= 4 && shipNum >= 4 && (DE + DD) >= 2
            case 13: // 鼠輸送作戦
                return flagshipLv >= 5 && shipNum >= 6 && (CL >= 1 && DD >= 4)
            case 14: // 包囲陸戦隊撤収作戦
                return flagshipLv >= 6 && shipNum >= 6 && (CL >= 1 && DD >= 3)
            case 15: // 囮機動部隊支援作戦
                return flagshipLv >= 6 && shipNum >= 6 && ((CV + CVL + CVB + AV) >= 2 && DD >= 2)
            case 16: // 艦隊決戦援護作戦
                return flagshipLv >= 10 && shipNum >= 6 && (CL >= 1 && DD >= 2)
            case 110: // 南西方面航空偵察作戦
                return flagshipLv >= 40 && shipNum >= 6 && (AV >= 1 && CL >= 1 && (DE + DD) >= 2) && (AA >= 200 && ASW >= 200 && LOS >= 140) && totalLv >= 150
            case 111: // 敵泊地強襲反撃作戦
                return flagshipLv >= 45 && shipNum >= 6 && (CA >= 1 && CL >= 1 && DD >= 3) && (FP >= 360 && AA >= 160 && ASW >= 160 && LOS >= 140) && totalLv >= 220
            case 112: // 南西諸島離島哨戒作戦
                return flagshipLv >= 50 && shipNum >= 6 && (AV >= 1 && CL >= 1 && (DE + DD) >= 4) && (FP >= 400 && AA >= 220 && ASW >= 220 && LOS >= 190) && totalLv >= 250
            case 113: // 南西諸島離島防衛作戦
                return flagshipLv >= 55 && shipNum >= 6 && (CA >= 2 && CL >= 1 && DD >= 2 && (SS + SSV) >= 1) && (FP >= 500 && AA >= 280 && ASW >= 280 && LOS >= 170) && totalLv >= 300
            case 114: // 南西諸島捜索撃滅戦
                return flagshipLv >= 60 && shipNum >= 6 && (AV >= 1 && CL >= 1 && DD >= 2) && (FP >= 510 && AA >= 400 && ASW >= 285 && LOS >= 385) && totalLv >= 330
            // 北方海域
            case 17: // 敵地偵察作戦
                return flagshipLv >= 20 && shipNum >= 6 && (CL >= 1 && DD >= 3)
            case 18: // 航空機輸送作戦
                return flagshipLv >= 15 && shipNum >= 6 && ((CV + CVL + CVB + AV) >= 3 && DD >= 2)
            case 19: // 北号作戦
                return flagshipLv >= 20 && shipNum >= 6 && (BBV >= 2 && DD >= 2)
            case 20: // 潜水艦哨戒任務
                return shipNum >= 2 && ((SS + SSV) >= 1 && CL >= 1)
            case 21: // 北方鼠輸送作戦
                return flagshipLv >= 15 && shipNum >= 5 && (CL >= 1 && DD >= 4) && totalLv >= 30 && drumShips >= 3 && totalLv >= 30
            case 22: // 艦隊演習
                return flagshipLv >= 30 && shipNum >= 6 && (CA >= 1 && CL >= 1 && DD >= 2) && totalLv >= 45
            case 23: // 航空戦艦運用演習
                return flagshipLv >= 50 && shipNum >= 6 && (BBV >= 2 && DD >= 2) && totalLv >= 200
            case 24: // 北方航路海上護衛
                return flagshipLv >= 50 && shipNum >= 6 && (flagshipStype === 3 && (DE + DD) >= 4) && totalLv >= 200
            // 南西海域
            case 41: // ブルネイ泊地沖哨戒
                return flagshipLv >= 30 && shipNum >= 3 && (DE + DD) >= 3 && (FP >= 60 && AA >= 80 && ASW >= 210) && totalLv >= 100
            case 42: // ミ船団護衛(一号船団)
                return flagshipLv >= 45 && shipNum >= 4 && (CL >= 1 && (DE + DD) >= 2 || isFleetEscortForce) && totalLv >= 200
            case 43: // ミ船団護衛(二号船団)
                return flagshipLv >= 55 && shipNum >= 6 && (((flagshipStype === 7 && flagship.max.taisen > 0) && (DE >= 2 || DD >= 2)) || (flagshipStype === 7 && CL === 1 && DD >= 4)) && (FP >= 500 && AA >= 280 && ASW >= 280 && LOS >= 170) && totalLv >= 300
            case 44: // 航空装備輸送任務
                return flagshipLv >= 35 && shipNum >= 6 && ((CV + CVL + CVB + AV) >= 2 && AV >= 1 && CL >= 1 && (DE + DD) >= 2) && (AA >= 200 && ASW >= 200 && LOS >= 150) && (drumShips >= 3 && drum >= 6) && totalLv >= 210
            case 45: // ボーキサイト船団護衛
                return flagshipLv >= 50 && shipNum >= 5 && (flagshipStype === 7 && (DE + DD) >= 4) && (AA >= 240 && ASW >= 300 && LOS >= 180) && totalLv >= 240
            // 西方海域
            case 25: // 通商破壊作戦
                return flagshipLv >= 25 && shipNum >= 4 && (CA >= 2 && DD >= 2)
            case 26: // 敵母港空襲作戦
                return flagshipLv >= 30 && shipNum >= 4 && ((CV + CVL + CVB + AV) >= 1 && CL >= 1 && DD >= 2)
            case 27: // 潜水艦通商破壊作戦
                return shipNum >= 2 && (SS + SSV) >= 2
            case 28: // 西方海域封鎖作戦
                return flagshipLv >= 30 && shipNum >= 3 && (SS + SSV) >= 3
            case 29: // 潜水艦派遣演習
                return flagshipLv >= 50 && shipNum >= 3 && (SS + SSV) >= 3
            case 30: // 潜水艦派遣作戦
                return flagshipLv >= 55 && shipNum >= 4 && (SS + SSV) >= 4
            case 31: // 海外艦との接触
                return flagshipLv >= 60 && shipNum >= 4 && (SS + SSV) >= 4 && totalLv >= 200
            case 32: // 遠洋練習航海
                return flagshipLv >= 5 && shipNum >= 3 && (flagshipStype === 21 && DD >= 2)
            case 131: // 西方海域偵察作戦
                return flagshipLv >= 50 && shipNum >= 5 && (flagshipStype === 16 && DD >= 3) && (AA >= 240 && ASW >= 240 && LOS >= 300) && totalLv >= 200
            case 132: // 西方潜水艦作戦
                return flagshipLv >= 55 && shipNum >= 5 && (flagshipStype === 20 && (SS + SSV) >= 3) && (FP >= 60 && AA >= 80 && ASW >= 50) && totalLv >= 270
            // 南方海域
            case 33: // 前衛支援任務
                return shipNum >= 2 && DD >= 2
            case 34: // 艦隊決戦支援任務
                return shipNum >= 2 && DD >= 2
            case 35: // MO作戦
                return flagshipLv >= 40 && shipNum >= 6 && ((CV + CVL + CVB + AV) >= 2 && CA >= 1 && DD >= 1)
            case 36: // 水上機基地建設
                return flagshipLv >= 30 && shipNum >= 6 && (AV >= 2 && CL >= 1 && DD >= 1)
            case 37: // 東京急行
                return flagshipLv >= 50 && shipNum >= 6 && (CL >= 1 && DD >= 5) && totalLv >= 200 && (drumShips >= 3 && drum >= 4)
            case 38: // 東京急行(弐)
                return flagshipLv >= 65 && shipNum >= 6 && DD >= 5 && totalLv >= 240 && (drumShips >= 4 && drum >= 8)
            case 39: // 遠洋潜水艦作戦
                return flagshipLv >= 3 && shipNum >= 5 && (AS >= 1 && (SS + SSV) >= 4) && totalLv >= 180
            case 40: // 水上機前線輸送
                return flagshipLv >= 25 && shipNum >= 6 && (flagshipStype === 3 && AV >= 2 && DD >= 2) && totalLv >= 150
            case 141: // ラバウル方面艦隊進出
                return flagshipLv >= 55 && shipNum >= 6 && (flagshipStype === 5 && CL >= 1 && DD >= 3) && (FP >= 450 && AA >= 350 && ASW >= 330 && LOS >= 250) && totalLv >= 290
            default:
                return undefined
        }
    }
    return false
}

/**
 * 特定装備の合計数を返します
 *
 * @param {[logbook.dto.ShipDto]} ships 艦娘リスト
 * @param {[Number]} slotitemId 装備IDリスト
 * @return {Number} 特定装備の合計
 */
function toHasItemSum(ships, slotitemId) {
    var s = slotitemId ? slotitemId : []
    return ships.map(function (ship) {
        return toItemList(ship).filter(function (item) {
            return s.indexOf(item.slotitemId) >= 0
        }).length
    }).reduce(function (previous, current) {
        return previous + current
    }, 0)
}

/**
 * 特定装備を積んだ艦の数を返します
 *
 * @param {[logbook.dto.ShipDto]} ships 艦娘リスト
 * @param {[Number]} slotitemId 装備IDリスト
 * @return {Number} 特定装備を積んだ艦の数
 */
function toHasItemShipNum(ships, slotitemId) {
    var s = slotitemId ? slotitemId : []
    return ships.filter(function (ship) {
        return toItemList(ship).some(function (item) {
            return s.indexOf(item.slotitemId) >= 0
        })
    }).length
}

/**
 * パラメータの合計した値を返します
 *
 * @param {[logbook.dto.ShipDto]} ships 艦娘リスト
 * @param {String} kind 集計するパラメータの種別
 * @return {Number} パラメータ合計値
 */
function toTotalValue(ships, kind) {
    return ships.map(function (ship) {
        return ship.param[kind] + toItemList(ship).reduce(function (previous, item, index) {
            var value = (function (item) {
                if (item.type4 > 0) {
                    if (ship.onSlot[index] > 0) {
                        return Math.floor(item.param[kind] * (-0.35 + Math.sqrt(Math.max(0, ship.onSlot[index] - 2))))
                    }
                    return -item.param[kind]
                }
                return 0
            })(item)
            return previous + value
        }, 0) + getImprovementBonus(ship, kind)
    }).reduce(function (previous, current) {
        return previous + current
    }, 0)

    function getImprovementBonus(ship, kind) {
        var items = toItemList(ship)
        if (kind === "houg") {
            return items.map(function(item) {
                switch(item.type2) {
                    /** 小口径主砲 */
                    case 1: return 0.5 * Math.sqrt(item.level)
                    /** 中口径主砲 */
                    case 2: return Math.sqrt(item.level)
                    /** 大口径主砲 */
                    case 3: return 0.9 * Math.sqrt(item.level)
                    /** 副砲 */
                    case 4: return 0.15 * item.level
                    /** 徹甲弾 */
                    case 19: return 0.5 * Math.sqrt(item.level)
                    /** 機銃 */
                    case 21: return 0.5 * Math.sqrt(item.level)
                }
                return 0
            }).reduce(function (previous, current) {
                return previous + current
            }, 0)
        }
        if (kind === "tyku") {
            return items.map(function(item) {
                switch(item.type3) {
                    /** 機銃 */
                    case 15: return Math.sqrt(item.level)
                    /** 高角砲 */
                    case 16: return 0.3 * item.level
                }
                return 0
            }).reduce(function (previous, current) {
                return previous + current
            }, 0)
        }
        if (kind === "tais") {
            return items.map(function(item) {
                switch(item.type2) {
                    /** ソナー */
                    case 14:
                    /** 爆雷 */
                    case 15: return Math.sqrt(item.level)
                }
                return 0
            }).reduce(function (previous, current) {
                return previous + current
            }, 0)
        }
        if (kind === "saku") {
            return items.map(function(item) {
                switch(item.type3) {
                    /** 電探 */
                    case 11: return Math.sqrt(item.level)
                }
                return 0
            }).reduce(function (previous, current) {
                return previous + current
            }, 0)
        }
        return 0
    }
}

/**
 * 艦娘の装備を返します
 *
 * @param {logbook.dto.ShipDto} ship 艦娘
 * @reutrn {[logbook.dto.ItemDto]} 装備
 */
function toItemList(ship) {
    var item2 = Java.from(ship.item2)
    item2.push(ship.slotExItem)
    return item2.filter(function (item) {
        return item
    })
}
