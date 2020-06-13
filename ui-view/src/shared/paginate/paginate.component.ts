import React from 'react';
import { Pagination, Props } from './paginate.type';

export class PaginateComponent extends React.Component<Props> {
    protected pagination: Pagination = { start: 0, step: this.props.step };

    componentDidMount() {
        this.callSearch();
    }

    /**
     * Call onChanges method whe the page changes
     */
    callSearch() {
        this.props.onChange(this.pagination);
    }

    /**
     * Select the page according to <code>option</code> parameter
     *
     * @param option
     */
    protected paginate(option: number) {
        switch (option) {
            case 1: {
                this.pagination.start += this.props.step;
                break;
            }
            case 2: {
                if (this.pagination.start <= 0) return;
                this.pagination.start -= this.props.step;
                break;
            }
            default: {
                this.pagination.start = 0;
            }
        }
        this.callSearch();
    }
}
