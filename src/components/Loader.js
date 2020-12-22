import React from 'react'
import { GridLoader } from 'react-spinners'

const Loader = ({ show }) => (
    show && <GridLoader
        color="darkorange"
        size={25}
        margin="5px"
    />
)

export default Loader;