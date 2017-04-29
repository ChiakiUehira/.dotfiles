if [ -f ~/.bashrc ] ; then
  . ~/.bashrc
fi

export PATH=~/.nodebrew/current/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:~/.shell



# The next line updates PATH for the Google Cloud SDK.
source '/Users/haco/google-cloud-sdk/path.bash.inc'

# The next line enables shell command completion for gcloud.
source '/Users/haco/google-cloud-sdk/completion.bash.inc'
