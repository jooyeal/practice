from crud import CRUD


class ETCSQL():

    def model_call(self):
        db = CRUD()
        datas = db.readDB(schema='public', table='tbl_model_info',
                          colum='model_no, device_type_code, op_mechanism_code, voltage_class_code, gas_pressure_lock_value')
        data_list = []
        for data in datas:
            data_list.append({'model_no': data[0], 'device_type_code': data[1], 'op_mechanism_code': data[2],
                              'voltage_class_code': data[3], 'gas_pressure_lock_value': float(data[4])})
        return data_list

    def qa_data_call(self):
        db = CRUD()
        datas = db.readDB(schema='public', table='tbl_diagnostics_qa',
                          colum='device_type_code, op_mechanism_code, abnormal_status_code, diag_qa_pattern_code')
        data_list = []
        for data in datas:
            data_list.append({'device_type_code': data[0], 'op_mechanism_code': data[1],
                              'abnormal_status_code': data[2], 'diag_qa_pattern_code': data[3]})
        return data_list

    def qa_list_data_call(self):
        db = CRUD()
        datas = db.readDB(schema='public', table='tbl_diag_qa_pattern',
                          colum='device_type_code, diag_qa_pattern_code, diag_question_code, diag_question_no, diag_ans_reg_method_code, diag_ans_list_group_code')
        data_list = []
        for data in datas:
            data_list.append({'device_type_code': data[0], 'diag_qa_pattern_code': data[1],
                              'diag_question_code': data[2], 'diag_question_no': data[3],
                              'diag_ans_reg_method_code': data[4], 'diag_ans_list_group_code': data[5]})
        return data_list

    def get_ans_list_value_call(self):
        db = CRUD()
        datas = db.readDB(schema='public', table='tbl_diag_ans_list_group',
                          colum='diag_ans_list_group_code, diag_ans_list_val_code, display_order', condition="")
        data_list = []
        for data in datas:
            data_list.append(
                {'diag_ans_list_group_code': data[0], 'diag_ans_list_val_code': data[1], 'display_order': data[2]})
        return data_list
