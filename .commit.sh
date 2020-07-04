git filter-branch --commit-filter '
        if [ "$GIT_COMMITTER_NAME" = "<bigboy212>" ];
        then
                GIT_COMMITTER_NAME="ashtyn3";
                GIT_AUTHOR_NAME="ashtyn3";
                GIT_COMMITTER_EMAIL="ashtyn3";
                GIT_AUTHOR_EMAIL="amb@storreasy.com";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi' HEAD
