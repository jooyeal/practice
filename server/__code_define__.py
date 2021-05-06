from crud import CRUD


def define_call(where_colum, where_colum_snd='', where_colum_trd=''):
    db = CRUD()
    datas = db.readDB(schema='public', table='tbl_code_define',
                      colum='code, code_name', condition=f"WHERE code_class = '{where_colum}' OR code_class = '{where_colum_snd}' OR code_class = '{where_colum_trd}'")
    data_list = []
    for data in datas:
        data_list.append({'code': data[0], 'code_name': data[1]})

    return data_list
