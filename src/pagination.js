import React from 'react';
import { Button, Icon } from 'semantic-ui-react';


export default function Pagination({ goToNextPage, goToPrevPage }) {
    return (
        <div style={{width: '15vw', display: 'flex', justifyContent: 'center', margin : '25px'}}>
            {goToPrevPage &&
                <Button animated onClick={goToPrevPage}>
                    <Button.Content visible>Prev</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow left' />
                    </Button.Content>
                </Button>
            }

            {goToNextPage &&
                <Button animated onClick={goToNextPage}>
                    <Button.Content visible>Next</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right' />
                    </Button.Content>
                </Button>
            }

        </div>
    )
}