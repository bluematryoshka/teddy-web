
import  "whatwg-fetch";//�������� fetch �� ����� ���������༭ fetch�� ���� ������ �ε��� ie��
import "@babel/polyfill";

import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';

import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

//mysql�� cafe24�� ������ nodejs ��ȣ������ �����ϰ�
//����ƴ� nodejs ��ȣ������ �Ⱥ��Դϴ�.

class Network_Model {
    Main_Data: any;
    Doll_Data: any;
    
    Render_Start(New_Arr: Array<Array<string>>) {

        render(
            <React.StrictMode>
                <App
                    src={this.Main_Data["src"]}
                    sub_src=""
                    info_src={New_Arr}
                    Doll={this.Doll_Data}
                    intro={this.Main_Data["intro"]}

                />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }
    async Get_Operation_from_Server() {//�ʱ� ��Ʈ��ũ ���� �������� async await�� ���������� ����
        const headers = new Headers({
            'Content-Type': 'text/xml',
        });
        
        let _promise = await window.fetch("http://localhost:1337/operation", { headers });//�������� fetch �� ����� ���� ���������༭ fetch�� ���� ������ �ε��� ie��
        return _promise.json();
    }
    async Get_Doll_from_Server() {//���� ��������
        const headers = new Headers({
            'Content-Type': 'text/xml',
        });

        let _promise = await window.fetch("http://localhost:1337/Get_Doll", { headers });//�������� fetch �� ����� ���� ���������༭ fetch�� ���� ������ �ε��� ie��
        return _promise.json();
    }
    async Get_NetWork_Start() {
        await this.Get_Operation_from_Server().then(
            (r) => this.Main_Data = r
        );
        let New_Arr: Array<Array<string>> = new Array<Array<string>>();
        for (let i = 0; i < 5; ++i) {
            New_Arr.push([this.Main_Data["intro_src_" + i], this.Main_Data["intro_sub_" + i] ]);
        }
        console.log(this.Main_Data)

        await this.Get_Doll_from_Server().then(
            (r) => this.Doll_Data = r
        );
        console.log(this.Doll_Data)
        this.Render_Start(New_Arr);
        console.log("Start");
    }
    constructor() {
       
        this.Get_NetWork_Start();
        //console.log("Start");
        //node js���� ���� �������� cors��å�� Access-Control-Allow-Origin�� �����Ͽ� cors ���� ����
       
       
    }
}
let _Network_Model = new Network_Model();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
