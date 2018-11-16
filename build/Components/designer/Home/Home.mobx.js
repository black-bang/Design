import { observable, action, flow, computed } from "mobx"
import { storage } from "api"
import { toJS } from "mobx"
import { ajax } from "api"
import url from "url"

export default class HomeInfoItem {
    constructor(query) {
        this.query = query;
    }
    @observable DesiItemList = []
    getDesignerInfoItemList = flow(function* () {
        try {
            const result = yield ajax.get({
                  url: "/api/User_Designer/ListAsync",
                  data: { pagesize:'4', openId:this.query['OpenId']}
                
            });
            this.DesiItemList = result.data;
           // console.log(result.data)
            return result
        } catch (error) {
            throw error;
        }
    })

     @observable LoveItemList = []
    getLoveItemList = flow(function* () {
        try {
            const result = yield ajax.get({
                  url: "/api/User_Designer/User_Designer_CaseListAsync",
                data: { pagesize: '4', openId:this.query['OpenId']}
                
            });
            this.LoveItemList = result.data;
            //console.log(result.data)
            return result
        } catch (error) {
            throw error;
        }
    })


}