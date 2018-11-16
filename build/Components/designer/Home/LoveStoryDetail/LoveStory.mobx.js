import { observable, action, flow, computed } from "mobx"
import { storage } from "api"
import { toJS } from "mobx"
import { ajax } from "api"
import url from "url"

export default class LoveInfoItem {
    constructor(query) {
        this.query = query;
    }
    @observable  LoveTitle = new Map()
    @observable LoveInfo = []
    getLoveInfoItemList = flow(function* () {
        try {
            const result = yield ajax.get({
                url: "/api/User_Designer/User_Designer_Case_DetailInfoAsync",
                data: { CaseId: this.query["CaseId"], openId:this.query['OpenId']}
                
            });
            this.LoveTitle = observable.map(result);
            this.LoveInfo = result.data;
           // console.log(result)
            return result
        } catch (error) {
            throw error;
        }
    })


}