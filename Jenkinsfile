pipeline {
	agent any
	stages {
		stage('Build') {
			steps {
				echo "Running build automation"
				sh './gradlew build --no-daemon'
				archiveArtifacts artifacts: 'dist/trainSchedule.zip'
				}
			}
		stage('DeployToStaging'){
			when {
				branch 'master'
				}
				steps {
					withCredentials([usernamePassword(credentialsId: 'webserver_login', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]){
						sshPublisher(
							failOnError: true,
							continueOnError: false,
							publishers: [
								sshPublisherDesc(
									configName: 'STAGING',
									transfers: [
										sshTransfer(
											sourceFiles: 'dist/trainSchedule.zip',
											removePrefix: 'dist/',
											remoteDirectory: '/tmp',
											execCommand: "sudo docker container stop train-schedule-app && sudo docker container rm train-schedule-app && sudo docker rmi \$(sudo docker images | grep 'train-schedule-app') && rm -rf /opt/train-schedule/* && unzip -o /tmp/trainSchedule.zip -d /opt/train-schedule && sudo docker build --no-cache -t train-schedule-app:${env.BUILD_NUMBER} /opt/train-schedule/ && sudo docker container run -d --name train-schedule-app --restart=unless-stopped -p 3000:3000 train-schedule-app:${env.BUILD_NUMBER}"
										)
									]
								)
							]
						)
					}
				}
			}
			stage('DeployToProduction'){
			when {
				branch 'master'
				}
				steps {
					input 'Does the staging environment look ok?'
					milestone(1)
					withCredentials([usernamePassword(credentialsId: 'webserver_login', usernameVariable: 'USERNAME', passwordVariable: 'USERPASS')]){
						sshPublisher(
							failOnError: true,
							continueOnError: false,
							publishers: [
								sshPublisherDesc(
									configName: 'STAGING',
									sshCredentials: [
										username: "$USERNAME",
										encryptedPassphrase: "$USERPASS"
									],
									transfers: [
										sshTransfer(
											sourceFiles: 'dist/trainschedule.zip',
											removePrefix: 'dist/',
											remoteDirectory: '/tmp',
											execCommand: 'sudo /usr/bin/systemctl stop train-schedule.service && rm -rf /opt/train-schedule/* && sudo unzip /tmp/trainSchedule.zip -d /opt/train-schedule && sudo chown deploy:wheel -R /opt/train-schedule/ && sudo /usr/bin/systemctl start train-schedule.service'
										)
									]
								)
							]
						)
					}
				}
			}
			
		}
	}