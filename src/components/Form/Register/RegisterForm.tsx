import React, { memo, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import { RegisterModel } from "@models/Auth";
import { useFormikContext } from "formik";
import { ROLE_OPTIONS } from "@constants/options";

const RegisterForm = () => {
  const [showPassword, setPassword] = useState<boolean>(false);
  const { touched, handleChange, errors } = useFormikContext<RegisterModel>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          id="userName"
          name="userName"
          label="Tên tài khoản"
          error={touched.userName && Boolean(errors.userName)}
          helperText={touched.userName && errors.userName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel
            htmlFor="password"
            error={touched.password && Boolean(errors.password)}
          >
            Mật khẩu
          </InputLabel>
          <OutlinedInput
            size="small"
            id="password"
            type={showPassword ? "text" : "password"}
            error={touched.password && Boolean(errors.password)}
            name="password"
            label="Mật khẩu"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {touched.password && errors.password && (
            <FormHelperText
              error={touched.password && Boolean(errors.password)}
            >
              {errors.password}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="role"
          name="role"
          select
          label="Vai trò"
          onChange={handleChange}
          variant="outlined"
          error={touched.role && Boolean(errors.role)}
          helperText={touched.role && errors.role}
          size="small"
          fullWidth
        >
          {ROLE_OPTIONS.map((option, i) => (
            <MenuItem key={i} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="email"
          name="email"
          label="Email"
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="firstName"
          name="firstName"
          label="Tên"
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="lastName"
          name="lastName"
          label="Họ"
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 1}}>
        <Stack direction="row" gap={1} justifyContent="flex-start" alignItems="center">
          <PriorityHighRoundedIcon fontSize="small" />
          <Typography variant="body1" fontWeight={600} fontSize={13}>
            Chỉ có quản lý mới có quyền cấp tài khoản cho người dùng.
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default memo(RegisterForm);
