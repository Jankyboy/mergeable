label
^^^^^^^^

::

    - do: labels
      # if label doesn't exist, it'll be created
      labels: [ 'Triage' ] # Only arrays are accepted

Supported Events:
::

    'schedule.repository', 'pull_request.*', 'issues.*'
