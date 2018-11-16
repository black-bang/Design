import { observable, action, flow, computed } from "mobx"
import { storage } from "api"
import { toJS } from "mobx"
import { ajax } from "api"
import url from "url"

export default class DesignerInfoItem {
    constructor(query) {
        this.query = query;
    }
    @observable InfoItemList = new Map()
    getDesignerInfoItemList = flow(function* () {
        try {
            const result = yield ajax.get({
                url: "/api/User_Designer/ModelAsync",
                data: { DesignerId: this.query["DesignerId"], openId:this.query['OpenId'] }
                
            });
            this.InfoItemList = observable.map(result);
            return result
        } catch (error) {
            throw error;
        }
    })


}