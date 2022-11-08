# sample-eks-express-api
Sample Express API with EKS Fargate 

## Workflow

Reference this [Serverless Guru article](https://www.serverlessguru.com/blog/run-serverless-containers-using-amazon-eks-aws-fargate)

### Create Docker image and push to ECR
```bash
docker build -t expapi:0.0.1 .
docker run -p 80:80 --name express-api --rm expapi:0.0.1
aws ecr create-repository --repository-name expapi
export REP_URI=$(aws ecr describe-repositories |jq '.repositories[] |select(.repositoryName=="expapi") | .repositoryUri' -r)
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin $REURI
docker tag expapi:0.0.1 $REP_URI
docker push $REP_URI
sed -i 's+%REP_URI%+'$REP_URI'+g' sample-deployment.yaml
```

### Update `sample-deployment.yaml`
```bash
sed -i 's+%REP_URI%+'$REP_URI'+g' sample-deployment.yaml
```

### Create EKS Cluster and service
```bash
eksctl create cluster sample-express-api --region eu-west-2 --fargate
kubectl create -f sample-deployment.yaml
kubectl create -f sample-service.yaml
export EXPR_API=$(kubectl get service express-api-service -ojson |jq '.status.loadBalancer.ingress[0].hostname' -r)
http -v $EXPR_API/food
```

