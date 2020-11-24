import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    header: {
        marginTop: theme.spacing(-1),
        marginLeft: theme.spacing(-0.5),
        marginBottom: theme.spacing(-2),
    },
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    image: {
        width: "100%"
    },
    creatorProfile: {
        width: "300px",
        marginBottom: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    creatorAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: theme.spacing(1),
    },
    participantsName: {
        marginLeft: theme.spacing(1.5),

    }
}));

const RecoCard = ({ reco }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <ListItem >
            <Card className={classes.root}>
                <CardHeader
                    className={classes.header}
                    avatar={
                        <div className={classes.creatorProfile}>
                            <AvatarGroup max={5}>
                                {reco.participants.map((person, index) => {
                                    return <Avatar key={index} alt={person.name} src={person.profileImageUrl} className={classes.avatar} />
                                })}
                            </AvatarGroup>
                            <Typography variant="body2" component="p" className={classes.participantsName} noWrap>
                                <strong>{reco.participants.map((item, index) => {
                                    if (index === reco.participants.length - 1) {
                                        return item.name
                                    } else {
                                        return item.name + ", "
                                    }
                                })}</strong>
                            </Typography>
                        </div>
                    }
                    action={
                        <IconButton aria-label="share">
                            <ShareIcon color="primary" />
                        </IconButton>
                    }

                />

                <img src={reco.imageHref.replace("https://over.localhost.achievers.com/", "https://over.achievers.com/")} className={classes.image}></img>
                <CardContent>
                    <div className={classes.creatorProfile}>
                        <Avatar alt={reco.creator.name} src={reco.creator.profileImageUrl} className={classes.creatorAvatar} />
                        <Typography variant="body2" component="p">
                            <strong>{reco.creator.name}</strong>
                        </Typography>
                    </div>
                    <Typography variant="h4" component="h2">
                        {reco.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {reco.message}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" >
                        <FavoriteIcon color="primary" />
                    </IconButton>
                    <Button
                        size="small"
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="comments"
                    >
                        Comments
                    </Button>
                    <Button
                        size="small"
                        onClick={()=> window.open(reco.publicUrl)}
                        aria-label="view"
                    >
                        View
                    </Button>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            Call API and get comments
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </ListItem>
    );
}

export default RecoCard;