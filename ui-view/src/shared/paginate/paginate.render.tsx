import React from 'react';
import { PaginateComponent } from './paginate.component';

export class PaginateRender extends PaginateComponent {

    render(): React.ReactElement {
        return (
            <div className="pagination">
                <button disabled={ this.pagination.start < this.props.step } onClick={ () => this.paginate(2) }
                        className="btn" title="previous">
                    <em className="eva eva-chevron-left eva-3x" />
                </button>
                <button onClick={ () => this.paginate(1) }
                        className="btn" title="next">
                    <em className="eva eva-chevron-right-outline eva-3x" />
                </button>
            </div>
        );
    }
}
