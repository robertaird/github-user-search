import React from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { ArrowForward, ArrowBack } from '@material-ui/icons';

type UserNavProps = {
  nextDisabled: boolean;
  nextPage: () => void;
  prevDisabled: boolean;
  prevPage: () => void;
};

export function UserNav({
  nextDisabled,
  nextPage,
  prevDisabled,
  prevPage,
}: UserNavProps) {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item>
        <IconButton
          data-testid="prevPage"
          color="secondary"
          disabled={prevDisabled}
          name="show previous users"
          className="load-prev"
          onClick={prevPage}
        >
          <Tooltip title="Back">
            <ArrowBack />
          </Tooltip>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          data-testid="nextPage"
          color="secondary"
          disabled={nextDisabled}
          name="show next users"
          className="load-more"
          onClick={nextPage}
        >
          <Tooltip title="Forward">
            <ArrowForward />
          </Tooltip>
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default UserNav;
