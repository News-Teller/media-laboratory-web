import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { AddCircle, RemoveCircle, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  collapsedContent: {
    paddingTop: 0,
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function MediaCard({
  id,
  term,
  definition,
  link,
  synonyms,
  tags,
  isSelected,
  onSelection,
  isDisabled,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded((prevState) => !prevState);
  };

  return (
    <div>
      <div>
        <h5>{term}</h5>
      </div>

      <div>
        <div>{definition}</div>
      </div>
      <div className="">
        <a className="" href={link}>source</a>
      </div>
      <div>
        {tags.map((tag) => (
          <div className="flex">
            <span>tags:</span> {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

MediaCard.propTypes = {
  id: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onSelection: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

MediaCard.defaultProps = {
  isSelected: false,
  isDisabled: false,
};
