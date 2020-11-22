import React from 'react';
import Box from '@material-ui/core/Box';

export const TabPanel = (props) => {
    const { children, value, index, className, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className={className}
            {...other}
        >
            {value === index && (
                <Box p={1} className={className}>
                    {children}
                </Box>
            )}
        </div>
    );
}
