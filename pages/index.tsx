import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
  CircularProgress,
  createTheme,
  Slider,
  Snackbar,
  Alert,
  ThemeProvider,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import copy from "copy-to-clipboard";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NextPage } from "next";
import { IPasswordResponse } from "../lib/interfaces";
import StyledContainer from "../lib/StyledContainer";
import StyledTextField from "../lib/StyledTextField";
import StyledStack from "../lib/StyledStack";
import { StyledHorizBox, StyledVertBox } from "../lib/StyledBox";
import StyledLinearProgress from "../lib/StyledLinearProgress";
import StyledList from "../lib/StyledList";
import PasswordFeaturesList from "../lib/PasswordFeaturesList";
import Head from "next/head";

const theme = createTheme({
  palette: {
    primary: purple,
  },
});

const Home: NextPage = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(15);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordStrengthColor, setPasswordStrengthColor] = useState<
    "error" | "info" | "success" | "primary"
  >("primary");
  const [passwordStrengthText, setPasswordStrengthText] =
    useState<string>("Waiting...");
  const [passwordStrengthTextColor, setPasswordStrengthTextColor] =
    useState<string>("#9c27b0");
  const [isFetchingPassword, setIsFetchingPassword] = useState<boolean>(false);
  const [useUppercase, setUseUppercase] = useState<boolean>(true);
  const [useLowercase, setUseLowercase] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSpecialChars, setUseSpecialChars] = useState<boolean>(true);
  const [openError, setOpenError] = useState<boolean>(false);
  const [openCopy, setOpenCopy] = useState<boolean>(false);

  const handleSliderChange = (value: number | number[]): void => {
    if (typeof value == "number") {
      setPasswordLength(value);
    }
  };

  const handlePasswordGenerated = (data: IPasswordResponse) => {
    setPassword(data.results.password);
    setPasswordStrength(((data.results.id + 1) / 5) * 100);
    if (data.results.id === 0 || data.results.id === 1) {
      setPasswordStrengthColor("error");
      setPasswordStrengthText(data.results.id === 0 ? "Very weak" : "Weak");
      setPasswordStrengthTextColor("#d32f2f");
    } else if (data.results.id === 2) {
      setPasswordStrengthColor("info");
      setPasswordStrengthText("Medium");
      setPasswordStrengthTextColor("#0288d1");
    } else {
      setPasswordStrengthColor("success");
      setPasswordStrengthText(data.results.id === 3 ? "Strong" : "Very strong");
      setPasswordStrengthTextColor("#2e7d32");
    }
  };

  const handleGenerateClick = async (): Promise<void> => {
    const uppercase = useUppercase ? "true" : "false";
    const lowercase = useLowercase ? "true" : "false";
    const numbers = useNumbers ? "true" : "false";
    const specialChars = useSpecialChars ? "true" : "false";
    setIsFetchingPassword(true);
    try {
      const res = await fetch(
        `/api?lowercase=${lowercase}&uppercase=${uppercase}&numbers=${numbers}&symbols=${specialChars}&length=${passwordLength}`
      );
      const data = (await res.json()) as IPasswordResponse;
      handlePasswordGenerated(data);
    } catch {
      setOpenError(true);
    }

    setIsFetchingPassword(false);
  };

  const handleCopyClick = () => {
    copy("Some text", {
      debug: true,
      message: "Hello world",
      onCopy: () => setOpenCopy(true),
    });
  };

  return (
    <>
      <Head>
        <title>Passwordio - Generate Your Secure Password</title>
      </Head>

      <ThemeProvider theme={theme}>
        <Snackbar
          open={openError}
          autoHideDuration={4000}
          onClose={() => setOpenError(false)}
        >
          <Alert
            onClose={() => setOpenError(false)}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Error! Cannot generate password
          </Alert>
        </Snackbar>
        <Snackbar
          open={openCopy}
          autoHideDuration={4000}
          onClose={() => setOpenCopy(false)}
        >
          <Alert
            onClose={() => setOpenCopy(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Copied to clipboard
          </Alert>
        </Snackbar>
        <StyledContainer maxWidth="xs">
          <StyledStack spacing={2}>
            <Avatar alt="Logo" src="/logo512.png" />
            <Typography variant="h4" textAlign="center">
              Passwordio
            </Typography>
            <Typography variant="body1" textAlign="center" color="#606060">
              Generate your secure password. Once you&apos;re done, click on the
              <span className="copy-text-span"> COPY </span>button to copy
              password
            </Typography>
          </StyledStack>
          <StyledTextField
            placeholder="Password goes here ..."
            size="small"
            fullWidth
            disabled
            value={password}
          />
          <StyledHorizBox>
            <StyledLinearProgress
              variant="determinate"
              aria-label="Password strength"
              color={passwordStrengthColor}
              value={passwordStrength}
            />
            <Typography color={passwordStrengthTextColor}>
              {passwordStrengthText}
            </Typography>
          </StyledHorizBox>
          <StyledHorizBox>
            <CopyToClipboard onCopy={() => handleCopyClick()} text={password}>
              <Button variant="outlined">Copy</Button>
            </CopyToClipboard>
            <Button
              variant="contained"
              disabled={isFetchingPassword}
              onClick={handleGenerateClick}
              sx={{ width: 105 }}
            >
              {isFetchingPassword ? <CircularProgress size={24} /> : "Generate"}
            </Button>
          </StyledHorizBox>
          <StyledVertBox>
            <Typography textAlign="left" color="#606060">
              Password Length
            </Typography>
            <Slider
              defaultValue={15}
              valueLabelDisplay="auto"
              min={4}
              max={128}
              aria-label="Password Length"
              onChange={(_, value, __) => handleSliderChange(value)}
            />
          </StyledVertBox>
          <StyledList>
            <PasswordFeaturesList
              checked={useUppercase}
              primary="Use uppercase"
              onClick={() => setUseUppercase(!useUppercase)}
            />
            <PasswordFeaturesList
              checked={useLowercase}
              primary="Use lowercase"
              onClick={() => setUseLowercase(!useLowercase)}
            />
            <PasswordFeaturesList
              checked={useNumbers}
              primary="Use numbers"
              onClick={() => setUseNumbers(!useNumbers)}
            />
            <PasswordFeaturesList
              checked={useSpecialChars}
              primary="Use special characters"
              onClick={() => setUseSpecialChars(!useSpecialChars)}
            />
          </StyledList>
        </StyledContainer>
      </ThemeProvider>
    </>
  );
};

export default Home;
