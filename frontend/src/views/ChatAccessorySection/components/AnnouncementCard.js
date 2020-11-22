import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ShareIcon from '@material-ui/icons/Share';
import Button from '@material-ui/core/Button';

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

const AnnouncementCard = ({ announcement }) => {
    const classes = useStyles();

    return (
        <ListItem >
            <Card className={classes.root}>
                {announcement.fileUpload && announcement.fileUpload.url &&
                    <img src={announcement.fileUpload.url.replace("https://over.localhost.achievers.com/", "https://over.achievers.com/")} className={classes.image}></img>
                }

                <CardContent>
                    <div className={classes.creatorProfile}>
                        <Avatar alt={announcement.creator.name} src={announcement.creator.profileImageUrl} className={classes.creatorAvatar} />
                        <Typography variant="body2" component="p">
                            <strong>{announcement.creator.name}</strong>
                        </Typography>
                    </div>
                    <Typography variant="h4" component="h2">
                        {announcement.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {announcement.message}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="share">
                        <ShareIcon color="primary" />
                    </IconButton>
                    <Button
                        size="small"
                        onClick={() => window.open(announcement.newsfeedEventURL)}
                        aria-label="view"
                    >
                        View
                    </Button>
                </CardActions>
            </Card>
        </ListItem>
    );
}

export default AnnouncementCard;