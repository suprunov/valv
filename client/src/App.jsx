import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DigitalPrinting from "./products/DigitalPrinting";
import Stickers from "./products/Stickers";
import OffsetPrinting from "./products/OffsetPrinting";
import WideFormatPrinting from "./products/WideFormatPrinting";
import Signs from "./products/Signs";
import Stamps from "./products/Stamps";
import FloatingGif from './components/FloatingGif/FloatingGif';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Цифровая печать" {...a11yProps(0)} />
                    <Tab label="Офсетная печать" {...a11yProps(1)} />
                    <Tab label="Широкоформатная печать" {...a11yProps(2)} />
                    <Tab label="Наклейки" {...a11yProps(3)} />
                    <Tab label="Таблички" {...a11yProps(4)} />
                    <Tab label="Печати и штампы" {...a11yProps(5)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <DigitalPrinting />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <OffsetPrinting />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <WideFormatPrinting />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Stickers />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <Signs />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                <Stamps />
            </CustomTabPanel>
        </Box>
    <FloatingGif />
        </>
    );
}