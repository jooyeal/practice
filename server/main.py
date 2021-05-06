from flask import request, Flask, jsonify
from flask_cors import CORS
from crud import CRUD
from __code_define__ import define_call
from __etc_sql__ import ETCSQL
import json

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False          # 日本語文字列が文字化けしないようにするおまじない
CORS(app)


@app.route("/")
def send_img():
    db = CRUD()
    es = ETCSQL()
    #
    # tbl_code_define 추출
    #
    customer_data = define_call(where_colum='CT')
    device_data = define_call(where_colum='DC')
    voltage_data = define_call(where_colum='VC')
    controller_data = define_call(where_colum='OM')
    state_data = define_call(where_colum='ST')
    as_data = define_call(where_colum='AS')
    get_qa_name = define_call(
        where_colum='DQ', where_colum_snd='AG', where_colum_trd='AL')

    #
    # 그 밖의 테이블 추출
    #
    model_info_data = es.model_call()
    get_qa_data = es.qa_data_call()
    get_qa_list_data = es.qa_list_data_call()
    get_ans_list_value = es.get_ans_list_value_call()

    return_data = {'customer': customer_data,
                   'device': device_data, 'model': model_info_data,
                   'voltage': voltage_data, 'controller': controller_data,
                   'state': state_data, 'as': as_data,
                   'get_qa_data': get_qa_data, 'get_qa_list_data': get_qa_list_data,
                   'get_qa_name': get_qa_name, 'get_ans_list_value': get_ans_list_value}

    return json.dumps(return_data, ensure_ascii=False)


if __name__ == '__main__':
    app.run(debug=True)
