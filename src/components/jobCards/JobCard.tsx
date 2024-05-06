import { Box, Stack, Typography, useTheme } from "@mui/material";
import { CustomBtn } from "../styledComponents/button/CustomBtn";

const JobCard = () => {
  // hooks
  const theme = useTheme();

  return (
    <Stack
      sx={{
        maxWidth: 360,
        width: "100%",
        padding: "1rem 1rem 0.5rem 1rem",
        boxShadow: theme.shadows[3],
        borderRadius: "20px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          padding: "0.1rem 0.6rem",
          border: `1px solid ${theme.palette.border.main}`,
          borderRadius: "50px",
          width: "fit-content",
          boxShadow: theme.shadows[1],
        }}
        mb="1rem"
      >
        <Typography variant="caption">⌛ Posted 10 days ago</Typography>
      </Stack>

      <Stack direction="row" gap="0.3rem" mb="0.7rem">
        <Stack>image</Stack>
        <Stack>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            Company name
          </Typography>
          <Typography>Backend Engineer</Typography>
          <Stack direction="row" alignItems="center" gap="0.3rem">
            <Typography variant="caption">Banglore</Typography>|
            <Typography variant="caption">Exp: 5-5 years</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Typography variant="body2" color={theme.palette.specialText.main} mb="0.5rem">
        Estimated salary
      </Typography>

      <Typography>About Company:</Typography>
      <Typography variant="body2" fontWeight={500}>
        About us
      </Typography>

      <Box sx={{ height: "15rem", position: "relative", overflow: "hidden" }}>
        <Typography variant="body2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae earum dolorem enim, placeat eius,
          dignissimos aliquam voluptatum sequi hic expedita quae laboriosam. Quas, consequatur quidem repellendus
          provident voluptates ipsa quod? Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta perspiciatis
          veniam corporis animi modi, veritatis distinctio doloremque unde laudantium adipisci possimus atque enim ullam
          libero minus eius beatae fugit eligendi. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum
          expedita excepturi temporibus voluptates rerum illum alias quaerat, nostrum dolorum incidunt cumque, itaque
          vel aperiam, corrupti ratione atque tenetur consequuntur accusantium?
        </Typography>
        <Stack
          alignItems="center"
          justifyContent="flex-end"
          pb="2rem"
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))",
          }}
        >
          <Typography
            component="a"
            href="#"
            variant="body2"
            fontWeight={300}
            color={theme.palette.border.secondary}
            sx={{ textDecoration: "none" }}
          >
            View job
          </Typography>
        </Stack>
      </Box>

      <Typography variant="body2" color={theme.palette.text.secondary} sx={{ letterSpacing: 1 }}>
        Minimum Experience
      </Typography>
      <Typography variant="body2" mb="0.5rem">
        2 years
      </Typography>

      <CustomBtn bgCol={theme.palette.btn.pri} textCol="black">
        ⚡ Easy Apply
      </CustomBtn>
      <CustomBtn bgCol={theme.palette.btn.sec} textCol="white">
        Unlock referral asks
      </CustomBtn>
    </Stack>
  );
};

export default JobCard;
