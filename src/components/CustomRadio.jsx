import { useRadio, Box, Image } from "@chakra-ui/react";

function CustomRadio(props) {
    const { image, ...radioProps } = props;
    const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
        useRadio(radioProps);

    return (
        <label {...htmlProps} cursor="pointer">
            <input {...getInputProps({})} hidden />
            <Box
                {...getCheckboxProps()}
                bg={state.isChecked ? 'green.200' : 'transparent'}
                w={12}
                h={12}
                p={2}
                rounded="full"
            >
                <Image src={image} {...getLabelProps()} />
            </Box>
        </label>
    );
}

export default CustomRadio