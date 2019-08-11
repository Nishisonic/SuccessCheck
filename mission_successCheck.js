/**
 * 遠征確認
 * @version 2.0.0
 * @author Nishikuma
 */

load('script/utils.js')
load('script/util_missioncheck.js')

var fleetId

function header() {
  return ['成功']
}

function begin(fleetId) {
  this.fleetId = fleetId
}

function body(data) {
  return toComparable([canMissionToString(data.id, this.fleetId)])
}

function end() {}
