import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    root: {
        widht: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: theme.spacing(3),

    },
    title: {
        width: "100%",
        textAlign: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    message: {
        width: "100%",
        textAlign: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    card: {
        maxWidth: 400,
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginBottom: theme.spacing(1),
    },
    personIcon: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    cardActions: {
        display: "flex",
        justifyContent: "center",
        marginBottom: theme.spacing(2),
    }

}));

const CoffeeChatMessage = ({ otherParticipant }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card}>

                <CardContent>
                    <Typography gutterBottom variant="h3" component="h2" className={classes.title}>
                        Coffee Chat!
                    </Typography>
                    <Grid container >
                        <Grid container direction="column" alignItems="center" item xs={12}>
                            <Avatar src={otherParticipant ? otherParticipant.imageUrl : ""} className={classes.avatar}>
                                <PersonIcon className={classes.personIcon} />
                            </Avatar>
                            <Typography variant="h5" >
                                <strong>{otherParticipant.name}</strong>
                            </Typography>
                            {/* <Typography gutterBottom variant="h6" >
                                Software Engineer
                         </Typography> */}
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.message}>
                        You have been paired with {otherParticipant.name} for a Coffee Chat. Take this opportunity to connect with your co-worker and learn a bit about them!
                    </Typography>
                </CardContent>

                <CardActions className={classes.cardActions} >
                    <Button size="small" color="primary" onClick={() => window.open(process.env.REACT_APP_OVER_URL + "/profile/" + otherParticipant.id)}>
                        View Profile
                    </Button>
                    <Button size="small" color="primary">
                        About Me
                     </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default CoffeeChatMessage;