// Copyright 2023
// Carlos Alberto Ruiz Naranjo [carlosruiznaranjo@gmail.com]
// Ismael Perez Rojo [ismaelprojo@gmail.com]
//
// This file is part of TerosHDL
//
// Colibri is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Colibri is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with TerosHDL.  If not, see <https://www.gnu.org/licenses/>.

import * as paht_lib from "path";

import { t_file_reduced } from '../../src/project_manager/common';
import {Project_manager} from '../../src/project_manager/project_manager';
import {get_default_config} from '../../src/config/config_declaration';

const DEFAULT_NAME = "def_name";

describe('project_manager', () => {
    let project_manager: Project_manager;

    beforeEach(() => {
        project_manager = new Project_manager(DEFAULT_NAME, undefined);
    });

    test('rename', () => {
        const new_name = "sancho_panza";

        expect(project_manager.get_name()).toBe(DEFAULT_NAME);
        project_manager.rename(new_name);
        expect(project_manager.get_name()).toBe(new_name);
    });

    test('add_toplevel_path', () => {
        project_manager.add_toplevel_path("path1");
        expect(project_manager.get_toplevel_path()).toStrictEqual(["path1"]);

        project_manager.add_toplevel_path("path2");
        expect(project_manager.get_toplevel_path()).toStrictEqual(["path2"]);
    });

    test('delete_toplevel_path', () => {
        project_manager.add_toplevel_path("path1");
        project_manager.delete_toplevel_path("path1");
        expect(project_manager.get_toplevel_path()).toStrictEqual([]);
    });

    // test('add_file_watcher', () => {

    // });

    // test('delete_file_watcher', () => {

    // });

    test('add_file', () => {
        const file_0 : t_file_reduced = {
            name: 'file_0',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_0',
            is_manual: false
        };

        const file_1 : t_file_reduced = {
            name: 'file_1',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_1',
            is_manual: false
        };

        project_manager.add_file(file_0);
        expect(project_manager.get_file()[0].name).toStrictEqual(file_0.name);

        project_manager.add_file(file_1);
        expect(project_manager.get_file()[1].name).toStrictEqual(file_1.name);
    });

    test('delete_file', () => {
        const file_0 : t_file_reduced = {
            name: 'file_0',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_0',
            is_manual: false
        };

        const file_1 : t_file_reduced = {
            name: 'file_1',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_1',
            is_manual: false
        };

        const file_2 : t_file_reduced = {
            name: 'file_2',
            is_include_file: false,
            include_path: '',
            logical_name: '',
            is_manual: false
        };

        project_manager.add_file(file_0);
        project_manager.add_file(file_1);
        project_manager.add_file(file_2);

        const result_0 = project_manager.delete_file("file_0", "logical_0");
        expect(project_manager.get_file()[0].name).toStrictEqual(file_1.name);
        expect(result_0.successful).toBe(true);
    
        const result_1 = project_manager.delete_file("file_1", "logical_5");
        expect(result_1.successful).toBe(false);

        const result_2 = project_manager.delete_file("file_1", "logical_1");
        expect(project_manager.get_file()[0].name).toStrictEqual(file_2.name);
        expect(result_2.successful).toBe(true);

        const result_3 = project_manager.delete_file("file_2");
        expect(project_manager.get_file()).toStrictEqual([]);
        expect(result_3.successful).toBe(true);
    });

    test('delete_file_by_logical_name', () => {
        const file_0 : t_file_reduced = {
            name: 'file_0',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_1',
            is_manual: false
        };

        const file_1 : t_file_reduced = {
            name: 'file_1',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_1',
            is_manual: false
        };

        const file_2 : t_file_reduced = {
            name: 'file_2',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_2',
            is_manual: false
        };

        project_manager.add_file(file_0);
        project_manager.add_file(file_1);
        project_manager.add_file(file_2);

        const result_0 = project_manager.delete_file_by_logical_name("logical_1");
        expect(project_manager.get_file()[0].name).toStrictEqual(file_2.name);
        expect(result_0.successful).toBe(true);

        const result_1 = project_manager.delete_file_by_logical_name("logical_1");
        expect(result_1.successful).toBe(false);
    });

    test('add_logical', () => {
        const logical_0 = "logical_0";
        const logical_1 = "logical_1";

        project_manager.add_logical(logical_0);
        expect(project_manager.get_file()[0].logical_name).toStrictEqual(logical_0);

        project_manager.add_logical(logical_1);
        expect(project_manager.get_file()[1].logical_name).toStrictEqual(logical_1);
    });


    test('check_if_file_in_project', () => {
        const file_0 : t_file_reduced = {
            name: 'file_0',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_1',
            is_manual: false
        };

        const file_1 : t_file_reduced = {
            name: 'file_1',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_1',
            is_manual: false
        };

        project_manager.add_file(file_0);
        project_manager.add_file(file_1);

        expect(project_manager.check_if_file_in_project("file_0", "logical_1")).toBe(true);
        expect(project_manager.check_if_file_in_project("file_1", "logical_1")).toBe(true);
        expect(project_manager.check_if_file_in_project("file_2", "logical_1")).toBe(false);
        expect(project_manager.check_if_file_in_project("file_0", "logical_2")).toBe(false);
    });

    test('check_if_path_in_project', () => {
        const file_0 : t_file_reduced = {
            name: 'file_0',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_1',
            is_manual: false
        };

        const file_1 : t_file_reduced = {
            name: 'file_1',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_1',
            is_manual: false
        };

        project_manager.add_file(file_0);
        project_manager.add_file(file_1);

        expect(project_manager.check_if_path_in_project("file_0")).toBe(true);
    });

    test('get_project_definition', () => {
        const file_0 : t_file_reduced = {
            name: 'file_0',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_1',
            is_manual: false
        };

        const file_1 : t_file_reduced = {
            name: 'file_1',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_1',
            is_manual: false
        };

        project_manager.add_file(file_0);
        project_manager.add_file(file_1);

        const project_definition = project_manager.get_project_definition();
        expect(project_definition.name).toBe(DEFAULT_NAME);
        expect(project_definition.file_manager.get()[0].name).toBe(file_0.name);
        expect(project_definition.file_manager.get()[1].name).toBe(file_1.name);
    });

    test('delete_phantom_toplevel', () => {
        const file_0 : t_file_reduced = {
            name: 'file_0',
            is_include_file: false,
            include_path: '',
            logical_name: 'logical_1',
            is_manual: false
        };

        project_manager.add_file(file_0);
        project_manager.add_toplevel_path(file_0.name);

        expect(project_manager.get_toplevel_path()[0]).toBe(file_0.name);

        project_manager.delete_file(file_0.name, file_0.logical_name);
        project_manager.delete_phantom_toplevel();

        expect(project_manager.get_toplevel_path()).toStrictEqual([]);
    });

    test('add_file_from_csv', () => {
        const csv_path = paht_lib.join(__dirname, "helpers", "prj.csv");
        const is_manual = false;

        const result = project_manager.add_file_from_csv(csv_path, is_manual);
        expect(result.successful).toBe(true);

        expect(project_manager.get_file()[0].name).toBe("/my/file_0.vhd");
        expect(project_manager.get_file()[0].logical_name).toBe("");
        expect(project_manager.get_file()[0].is_manual).not.toBeTruthy();

        expect(project_manager.get_file()[1].name).toBe("/my/file_1.vhd");
        expect(project_manager.get_file()[1].logical_name).toBe("sample_lib");

        expect(project_manager.get_file()[2].name).toBe("/my/file_2.vhd");
        expect(project_manager.get_file()[1].logical_name).toBe("sample_lib");
    });

    test('set_config, get_config', () => {
        const default_config = get_default_config();
        default_config.tools.ghdl.installation_path = "ghdl_path";

        project_manager.set_config(default_config);
        expect(project_manager.get_config()).toBe(default_config);
    });

});