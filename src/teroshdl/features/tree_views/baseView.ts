// Copyright 2023
// Carlos Alberto Ruiz Naranjo [carlosruiznaranjo@gmail.com]
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

import { e_event } from 'colibri/project_manager/projectEmitter';
import { e_viewType, REFRESHLIST } from './common';

export abstract class BaseView {
    private viewType: e_viewType;

    constructor(viewType: e_viewType) {
        this.viewType = viewType;
    }

    public getRefreshEventList(): e_event[] {
        return REFRESHLIST[this.viewType];
    }
}